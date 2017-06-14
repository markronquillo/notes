# Rogelio Guzman - Jest Snapshots and Beyond - React Conf 2017

_https://www.youtube.com/watch?v=HAuXJVI_bUs_

`yarn jest -- --watch`

`expect(sum(1,2)).toMatchSnapshot()`

What does the `toMatchSnapshot` does?

1. First it gets the output of the function.
2. It then checks if we have a saved snapshot for this.

    2.1. If there's none, save it in .snap file.
    2.2. If there is, check if the output is same with snapshot. Pass the test if yes, otherwise fail.

NOTE: DIDN'T FINISH, watch this again after you're familiar with the basics.


