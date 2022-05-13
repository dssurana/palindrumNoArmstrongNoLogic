

var express = require('express');
const req = require('express/lib/request');
var mongodb = require('mongodb')

var user = require('../model/demomodel');




exports.getData = (request, response) => {
        user.find()
                .then(result => {
                        console.log("Result: ", result)
                        return response.status(200).json(result)
                })
                .catch(error => {
                        console.log("error: ", error)
                        return response.status(500).json({ error: error })
                })
}

exports.deleteByUser = async (req, res) => {
        try {
                let myQuery = { first_name: req.body.first_name }
                let result = await user.deleteOne(myQuery, (err, result) => {
                        if (err) {
                                console.log("err", err)
                                return res.status(500).json(err)

                        }
                        return res.status(200).json(result)
                })


        } catch (error) {
                console.log("error occured")

        }


}
exports.patchData = (req, res) => {
        let query = { first_name: req.body.first_name };
        let newQuery = { $set: { middle_name: req.body.middle_name } }

        user.updateOne(query, newQuery, (err, response) => {
                if (err) {
                        console.log("error", error)
                        return res.status(500).json(err)
                }
                return res.status(200).json(response)
        })

}
exports.getPage = async (req, res) => {
        try {
                var limitValue = req.body.limit || 3
                var skipValue = req.body.skip || 2
                let result = await user.find().limit(limitValue).skip(skipValue)
                res.status(200).json(result)
        } catch (err) {
                console.log(err)
        }
}


exports.postData = async (req, res) => {
        try {
                user.create({
                        first_name: req.body.first_name,
                        middle_name: req.body.middle_name,
                        last_name: req.body.last_name,
                })
                        .then(result => {
                                console.log("result:", result)
                                return res.status(200).json(result)
                        })
                        .catch(error => {
                                console.log("error:", error)
                                return res.status(500).json({ error: error })

                        })
        } catch (error) {
                console.log("error:", error)

        }

}
exports.delbyid = (req, res) => {

        //  var query = { _id: new mongodb.ObjectId(req.body.id) }
        var id = { _id: new mongodb.ObjectId(req.body.id) }
        user.findByIdAndDelete(id, (err, result) => {
                if (err) {
                        return res.status(500).json()
                }
                else {
                        console.log(result)
                        return res.status(200).json(result)

                }

        })

}
exports.armstrongNumber = (req, res) => {
        // program to check an Armstrong number of three digits

        let sum = 0;

        let number = 153//req.body.number
        console.log("number:-",number)
        // create a temporary variable
        let temp = number;

        while (temp > 0) {
                
                // finding the one's digit
                let remainder = temp % 10;
                sum += remainder * remainder * remainder;

                // removing last digit from the number
                temp = parseInt(temp / 10); // convert float into integer
                
        }

        // check the condition
        if (sum == number) {
                console.log(`${number} is an Armstrong number`);
        }
        else {
                console.log(`${number} is not an Armstrong number.`);
        }
}


exports.Palindrome = () => {
        var rem, temp, final = 0;
        var number = 455

        temp = number;
        while (number > 0) {
                rem = number % 10;
                number = parseInt(number / 10);
                final = final * 10 + rem;
        }
        if (final == temp) {
                console.log("The inputed number is Palindrome");
        }
        else {
                console.log("The inputted number is not palindrome");
        }
}

exports.stringPalindrome = () => {
        // program to check if the string is palindrome or not


        // convert string to an array
        string = "naman"
        const arrayValues = string.split('');
        console.log(arrayValues)
        // reverse the array values
        const reverseArrayValues = arrayValues.reverse();

        // convert array to string
        const reverseString = reverseArrayValues.join('');

        if (string == reverseString) {
                console.log('It is a palindrome');
        }
        else {
                console.log('It is not a palindrome');
        }
}




