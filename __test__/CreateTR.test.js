import { createTR } from '../src/client/js/formHandler'


// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the createTR functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test("Testing the createTR() function", () => {
            // alert.mockClear()
           // Define the input for the function, if any, in the form of variables/array
           const data1 = "segment"
           const data2 = "data"
           // Define the expected output, if any, in the form of variables/array
           const output = "<tr><td>segment</td><td>data</td><td>data</td><td>data</td><td>data</td></tr>"
        //                 <tr><td>segment</td><td>data</td><td>data</td><td>data</td><td>data</td></tr>
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(createTR(data1,data2,data2,data2,data2).outerHTML).toBe(output);
})});