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

func NewSaiyan(name string, power int) Saiyan {
	return Saiyan{
		Name: name,
		Power: power,
	}
}

func main() {
	goku := NewSaiyan("Goku", 900000)
	fmt.Println(goku.Name, goku.Power)
}

