import tweepy
import pickle
import pandas as pd

consumer_key = "oIbrARLL6QbmbrJJhdl6fh1Bn"
consumer_secret = "YMEgyrhiblOFhCmHE3pfco85MBrhs8mSF9lyOGI3GzAZXBVx2P"
access_key = "806491866992676865-kaU9QCjQgdQgLPgoDOe50wGdtddJ9xZ"
access_secret = "KWFUurS6omuhKstXV2aGjDk4tDgUHk0dZWs2uuZOqR5m3"

fscore_map={'toxic':'Toxic',
                'severe_toxic':'Severe Toxic',
                'obscene':'Obscene',
                'threat':'Threat',
                'insult':'Insult',
                'identity_hate':'Identity Hate'}
class Predictor():
    def __init__(self):
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_key, access_secret)
        self.api = tweepy.API(auth)
        self.df = pd.read_csv('traintoxic.csv')
        with open('./Models/vectorizer.pickle', 'rb') as f:
            self.tfidf = pickle.load(f)
        self.class_names = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']

    def get_details(self,user_id):
        details = self.api.get_user(user_id)
        return {
            'name': details.name,
            'picture_url': details.profile_image_url,
            'id': details.screen_name
        }
    def search_user(self, user_name):
        idx=self.api.get_user(screen_name=user_name).screen_name
        user_details = self.get_details(idx)
        fscore=self.status_search(idx)
        return ({'user':user_details, 'fscore':fscore})

    def status_search(self, idx):
        fscore={'Toxic':0,
                'Severe Toxic':0,
                'Obscene':0,
                'Threat':0,
                'Insult':0,
                'Identity Hate':0}
        fdata = self.api.user_timeline(id=idx, count=50)
        for tweets in fdata:
            txt = [tweets.text]
            txt = self.tfidf.transform(txt)
            for classn in self.class_names:
                y = self.df[classn]
                score=0
                with open('./Models/' + classn + '_model.pkl', 'rb') as f:
                    model = pickle.load(f)
                    fscore[fscore_map[classn]]+=int(model.predict(txt))
        return fscore    

    def predict(self, user_id):
        friend_ids = self.api.friends_ids(user_id=user_id)
        fobj=[]
        for idx in friend_ids[0:6]:
            fscore=self.status_search(idx)
            user_details = self.get_details(idx)
            fobj.append({'user':user_details, 'fscore':fscore})
        return fobj

    def test_text(self, text):
        text=self.tfidf.transform([text])
        fscore={'Toxic':0,
                'Severe Toxic':0,
                'Obscene':0,
                'Threat':0,
                'Insult':0,
                'Identity Hate':0}
        for classn in self.class_names:
            y = self.df[classn]
            score=0
            with open('./Models/' + classn + '_model.pkl', 'rb') as f:
                model = pickle.load(f)
                fscore[fscore_map[classn]]+=int(model.predict(text))
        return fscore
    
    def block(self, user_id):
        # return self.api.create_block(user_id)
        return "OK"

    def mute(self, user_id):
        return self.api.create_block(user_id) 

    def friendship(self,user_id,target):
        fdata=self.api.show_friendship(source_screen_name=user_id,target_screen_name=target)
        fdata={
            "blocking": fdata[0].blocking,
            "muting": fdata[0].muting
        }
        return fdata

if __name__== "__main__" :
    pred = Predictor()
    print(pred.predict('DhaarnaSethi'))