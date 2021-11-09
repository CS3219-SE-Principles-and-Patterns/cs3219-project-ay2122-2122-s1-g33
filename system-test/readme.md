# System Testing instructions

1. Download [Apache Jmeter](https://jmeter.apache.org/download_jmeter.cgi)

2. Unzip and locate `bin` folder

3. Run GUI by running the `Jmeter` executable

4. Generate test plan in GUI and save file (in `.jmx`)

5. In the command line, run the following:

```shell
jmeter -n -t [saved .jml file] -l [output .jtl file]
```

Example:

```shell
jmeter -n -t my_test.jmx -l log.jtl
```

Reference:

[Load testing](https://medium.com/slalom-build/load-testing-in-a-nutshell-7f7568811217)

[Stress testing](https://www.blazemeter.com/blog/stress-testing-with-jmeter-and-blazemeter-a-tutorial)