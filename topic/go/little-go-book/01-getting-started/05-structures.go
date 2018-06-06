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
	vegeta := Saiyan{"Vegeta", 900}

	fmt.Println(goku.Name, vegeta.Name)
}