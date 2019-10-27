from bs4 import BeautifulSoup as bs
from urllib.request import Request, urlopen
from json import loads
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from sys import exit

headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"} 
db = 0

def init_firebase():
    global db
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred, {
        "projectId": "usamc-1f05d",
    })
    db = firestore.client()

def get_bs(url):
    request = Request(url, None, headers)
    return bs(urlopen(request).read(), "html.parser")


def validate_page(url):
    b = get_bs(url)
    lines = b.find("div", {"class": "o-poem"})
    if not lines: return False
    return len(lines.find_all("div")) > 1


def get_lines(url, id):
    b = get_bs(url)
    lines = b.find("div", {"class": "o-poem"}).find_all("div")
    ct = 0
    l = []
    for i in range(len(lines)):
        if lines[i].text:
            ct += 1
        if i != len(lines) - 1:
            l.append(lines[i].text)
    if b.find("div", {"class": "c-epigraph"}):
        ct -= 2
        l.pop(0)
        l.pop(0)
    db.collection("poems").document(id).update({
        "lines": l,
        "length": ct
    })


def get_poems(page):
    assert page < 2254 and page > 0, "Page number must be between 1 and 2253"
    url = "https://www.poetryfoundation.org/ajax/poems/page/{}".format(page)
    request = Request(url, None, headers)
    json = loads(urlopen(request).read().decode())
    for entry in json["Entries"]:
        if validate_page(entry["link"]):
            db.collection("poems").document(str(entry["id"])).set({
                "title": entry["title"],
                "author": entry["author"],
                "link": entry["link"]
            })
            yield entry["link"], str(entry["id"])


def main():
    init_firebase()
    with open("job", "r") as f:
        start = int(f.readline())
    for i in range(start, 2254):
        try: 
            print("[INFO] Scraping page {}".format(i))
            for link, id in get_poems(i):
                get_lines(link, id)
        except KeyboardInterrupt:
           print("Exiting gracefully...")
           with open("job", "w") as f:
               f.write(str(i))
           exit(0)


if __name__ == "__main__":
    main()
