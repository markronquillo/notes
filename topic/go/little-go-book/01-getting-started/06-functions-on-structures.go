package main

import (
	"fmt"
)

type Saiyan struct {
	Name string
	Power int
}

func main() {
	goku := Saiyan{
		Name: "Goku",
		Power: 900000,
	}
	// this won't change the value of Power
	Super(goku)
	fmt.Println(goku.Name, goku.Power)

	// to make it change the value, we need to pass 
	// a pointer
	gohan := &Saiyan{
		Name: "Gohan",
		Power: 10000,
	}
	SuperSaiyan(gohan)
	fmt.Println(gohan.Name, gohan.Power)
}

func Super(s Saiyan) {
	s.Power += 1000
}

func SuperSaiyan(s *Saiyan) {
	s.Power = 90000000;
}