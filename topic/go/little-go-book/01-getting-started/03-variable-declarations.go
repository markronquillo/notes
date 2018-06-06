package main 

import (
	"fmt"
)

func main() {
	var value int
	value = 10000
	fmt.Println("Value: ", value)

	// var anotherValue int = 10000
	// val := 900
	// having val := 1000, will throw an error	

	name, power := "Goku", 199000
	power = 900
	fmt.Println(name, power)
}