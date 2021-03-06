var _ = require('lodash');
var Cat = require('../models/catModel.js');

module.exports = function (app) {

    //Create
    app.post('/cat', function (req, res) {
        var newCat = new Cat(req.body);
        newCat.save(function (err) {
            if (err) {
                res.json({ info: 'error during cat create', error: err });
            };
        });
        res.json({ info: 'Cat created successfully!' });
    });

    //Read
    app.get('/cat', function (req, res) {
        Cat.find(function (err, cats) {
            if (err) {
                res.json({ info: 'error during find cats', error: err });
            };
            res.json({ info: 'Cats  found successfully!',data:cats });
        });
    });

    app.get('/cat/:id', function (req, res) {
        Cat.findById(req.params.id,function (err, cat) {
            if (err) {
                res.json({ info: 'error during find cats', error: err });
            };
            if (cat) {
                res.json({ info: 'Cat  found successfully!', data: cat });
            }
            else
                res.json({ info: 'Cat not found!' });
        });
    });

    //Update
    app.put('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function (err, cat) {
            if (err) {
                res.json({ info: 'error during find cats', error: err });
            };
            if (cat) {
                _.merge(cat, req.body);
                cat.save(function (err) {
                    if (err) {
                        res.json({ info: 'error during cat update', error: err });
                    };
                    res.json({ info: 'Cat updated successfully!'});
                });
            }
            else {
                res.json({ info: 'Cat not found!' });
            }
        });
    });

    //Delete
    app.delete('/cat/:id', function (req, res) {
        Cat.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error during remove cat', error: err });
            }
            res.json({ info: 'Cat removed successfully!' });
        });
    });

    return app;

};