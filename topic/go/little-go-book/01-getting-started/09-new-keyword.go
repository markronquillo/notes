package main

import (
	"fmt"
)

// structs don't have constructors 
// so you have to create a function that
// returns an instance of the desired type

type Saiyan struct {
	Name string
	Power int
}

func (s *Saiyan) Super() {
	s.Power += 10000
}

func main() {
	goku := new(Saiyan)
	goku.Name = "Goku"
	goku.Power = 990000
	// the previous codes are the 
	// same with 
	// goku := &Saiyan{...}	
}

