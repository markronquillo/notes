from tweepy import OAuthHandler
from tweepy import Stream
from tweepy.streaming import StreamListener
from elasticsearch import Elasticsearch
from twconfig import config
import json

es = Elasticsearch('localhost:9200')

class StdOutListener(StreamListener):
	"""A listener handles tweets that are received from the stream.
	This listener dumps the tweets into elasticsearch
	"""
	counter = 0
	total_docs_to_be_indexed = 10000

	def on_data(self, data):
		print(data)
		while self.total_docs_to_be_indexed > self.counter:
			tweet = json.loads(data)
			self.index_tweet(tweet)
			self.counter += 1
			return True

	def index_tweet(self, tweet):
		es.index(index='twitter', doc_type='tweets', id=tweet['id_str'], body=tweet)

	def on_error(self, status):
		print(status)


if __name__ == '__main__':
	listener = StdOutListener()
	auth = OAuthHandler(config['consumer_key'], config['consumer_secret'])
	auth.set_access_token(config['access_token'], config['access_token_secret'])
	stream = Stream(auth, listener)
	# set the terms for tracking and fetching tweets from Twitter
	stream.filter(track=['crime', 'blast', 'earthquake', 'riot', 'politics'])


