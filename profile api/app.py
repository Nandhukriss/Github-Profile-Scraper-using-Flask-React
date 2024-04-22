from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from helpers import parse_html

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
BASE_URL = "https://github.com"


@app.route("/<username>")
@cross_origin()
def get_data(username):

    try:
        username = username.lower().strip()

        # To get home page data
        home_page = parse_html(f"{BASE_URL}/{username}")
        avatar_class_content = home_page.find_all("img", class_="avatar")
        image_url = avatar_class_content[0].get("src")
        repositories = home_page.find("span", class_="Counter").text
        name = home_page.find("h1", class_="vcard-names").find("span").text.strip()
        stars = (
            home_page.select_one('[data-tab-item="stars"]').find("span").text.strip()
        )

        # To get followers and following  data
        all_anchors = home_page.find_all("a", class_="Link--secondary")

        for follow in all_anchors:
            if (
                follow["href"]
                and follow["href"].lower() == f"{BASE_URL}/{username}?tab=followers"
            ):
                followers = follow.find("span", class_="text-bold").text
                all_follwers_page = parse_html(f"{BASE_URL}/{username}?tab=followers")

                total_followers = []
                for follower in all_follwers_page.select(".f4.Link--primary"):
                    if follower.text != "":
                        total_followers.append(follower.text.strip())

            if (
                follow["href"]
                and follow["href"].lower() == f"{BASE_URL}/{username}?tab=following"
            ):
                followings = follow.find("span", class_="text-bold").text
                all_follwing_page = parse_html(f"{BASE_URL}/{username}?tab=following")
                total_following = []
                for following in all_follwing_page.select(".f4.Link--primary"):
                    if following.text != "":
                        total_following.append(following.text.strip())

        # To get repo  data

        all_repos = parse_html(f"{BASE_URL}/{username}?tab=repositories")

        all_repos_headings = all_repos.find_all("h3", class_="wb-break-all")

        profile_info = {
            "name": name,
            "image_url": image_url,
            "repositories": repositories,
            "stars": stars,
            "followers": followers,
            "following": followings,
        }

        repo_details = []

        for headings in all_repos_headings:
            for repo_title in headings.find_all("a"):
                data = {}
                data["Repository Name"] = repo_title.text.strip()
                data["Repository Link"] = f"{BASE_URL}/" + repo_title["href"]

            repo_details.append(data)
        profile_info["all_repositories"] = repo_details
        profile_info["total_followers"] = total_followers
        profile_info["total_following"] = total_following

    except ValueError as e:
        profile_info = {"message": "Invalid Username!"}, 400
    except Exception as e:
        profile_info = {"message": "An unexpected error occurred!"}, 500
    return jsonify(profile_info)


if __name__ == "__main__":
    app.run(debug=True)
