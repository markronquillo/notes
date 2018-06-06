package main

import (
	"fmt"
)

func log(message string) {
	fmt.Println(message)
}

func add(a int, b int) {
	fmt.Println(a + b)
}

func power(val int) (int, int) {
	return 1, val
}

func main() {
	log("testing")
	add(1, 10)
	_, x := power(10)
	fmt.Println(x)
}
