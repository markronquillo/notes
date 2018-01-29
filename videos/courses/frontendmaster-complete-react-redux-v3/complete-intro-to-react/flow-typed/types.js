// @flow

declare var module: {
	hot: {
		accept(path: string, callback: () => void): void
	}
}

type Show = {
  title: string, 
  description: string, 
  year: sring, 
  imdbID: string, 
  trailer: string, 
  poster: string
}
