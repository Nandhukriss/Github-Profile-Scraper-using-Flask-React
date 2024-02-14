from flask import Flask, jsonify,render_template
import requests
from flask_cors import CORS, cross_origin
from bs4 import BeautifulSoup
app=Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<username>')
@cross_origin()
def get_data(username):
    
    try:

        github_page_html=requests.get(f'https://github.com/{username}').text
        soup=BeautifulSoup(github_page_html,"html.parser")
        #To get all image tag with class avatar
        avatar_class_content = soup.find_all('img',class_='avatar')
        #To get image url 
        image_url =avatar_class_content[0].get('src')
        repositories = soup.find('span',class_="Counter").text
        profile_info={
            'image_url':image_url,
            'repositories':repositories
        }

    except:
        profile_info = {
            "message": "Invalid Username!"
        }, 400
    return jsonify(profile_info)

if __name__ =="__main__":
    app.run(debug=True)