from bs4 import BeautifulSoup as bs
from urllib.request import Request, urlopen

headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"} 

def get_html(url):
    request = Request(url, None, headers)
    return urlopen(request).read()


def validate_page(url):
    b = bs(get_html(url), "html.parser")
    return not not b.find("div", {"class": "o-poem"})


def get_lines(url):
    b = bs(get_html(url), "html.parser")
    lines = b.find("div", {"class": "o-poem"}).find_all("div")
    ct = 0
    l = []
    for i in range(len(lines)):
        if lines[i].text:
            ct += 1
        if i != len(lines) - 1:
            l.append(lines[i].text)
    return ct, l 


def get_poems(page):
    b = bs(get_html("https://www.poetryfoundation.org/poems/browse#page={}&sort_by=title".format(page)), "html.parser")
    for poem in b.find_all("li"):
        link = poem.find_all("a")[0]["href"]
        print(link)


def main():
    get_poems(1)


if __name__ == "__main__":
    main()
