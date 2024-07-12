import requests
from bs4 import BeautifulSoup


def parse_html(url):
    try:
        # Send GET request to the specified URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad responses

        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, "html.parser")

        # Return the parsed BeautifulSoup object
        return soup

    except requests.exceptions.RequestException as e:
        print(f"Error occurred while fetching URL: {e}")
        return None
