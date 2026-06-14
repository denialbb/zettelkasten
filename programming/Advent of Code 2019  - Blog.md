#programming #go
- [GitHub repo](https://github.com/dnbias/aoc2019)

My blog of the epic [[Advent of Code]] 2019.
Just to write down what I learnt by solving the problems, leaning a new language: [goland]
# day 1
did a bit of good old bash scripting to get the day input through `curl`
- [get_input.sh](https://github.com/dnbias/aoc2019/get_input.sh)
 reading from files 
 ```golang
input_file, err := os.Open("input")
if err != nil {
	log.Fatal(err)
}
 ```
 scanning line by line for integers
 ```golang
filescanner := bufio.NewScanner(input_file)

for filescanner.Scan() {
	line := filescanner.Text()
	i, err := strconv.Atoi(line)
	if err != nil {
		log.Fatal(err)
	}
}
 ```
 outputting to file
 ```golang
 fmt.FPrint(result)
 ```
 did some testing with a couple files `test` and `results`
# day 2
