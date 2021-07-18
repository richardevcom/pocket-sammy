const Url = require('../models/url.model.js')

// Create and Save a new Url
exports.create = (req, res) => {
    // Validate request
    if(!req.body.url) {
        return res.status(400).send({
            message: "URL cannot be empty!"
        });
    }

    // Create a URL
    const url = new Url({
        title: req.body.title || "Untitled URL", 
        url: req.body.url,
        public: true
    });

    // Save URL in the database
    url.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating URL."
        });
    });
}

// Retrieve and return all Urls from the database.
exports.findAll = (req, res) => {
    Url.find()
    .then(urls => {
        res.send(urls);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving URLs."
        });
    });
}

// Find a single Url with a urlId
exports.findOne = (req, res) => {
    Url.findById(req.params.urlId)
    .then(url => {
        if(!url) {
            return res.status(404).send({
                message: "URL with id " + req.params.urlId + " was not found."
            });            
        }
        res.send(url);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "URL with id " + req.params.urlId + " was not found."
            });                
        }
        return res.status(500).send({
            message: "An error occured while retrieving url with id " + req.params.urlId + "."
        });
    });
}

// Update a Url identified by the urlId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.url) {
        return res.status(400).send({
            message: "URL cannot be empty!"
        });
    }

    // Find url and update it with the request body
    Url.findByIdAndUpdate(req.params.urlId, {
        title: req.body.title || "Untitled URL",
        url: req.body.url,
        public: true
    }, {new: true})
    .then(url => {
        if(!url) {
            return res.status(404).send({
                message: "URL with id " + req.params.urlId + " was not found."
            });
        }
        res.send(url);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "URL with id " + req.params.urlId + " was not found."
            });                
        }
        return res.status(500).send({
            message: "An error occured while updating URL with id " + req.params.urlId + "."
        });
    });
}

// Delete a Url with the specified urlId in the request
exports.delete = (req, res) => {
    Url.findByIdAndRemove(req.params.urlId)
    .then(url => {
        if(!url) {
            return res.status(404).send({
            });
        }
        res.send({message: "URL deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
            });                
        }
        return res.status(500).send({
            message: "Could not delete URL with id " + req.params.urlId
        });
    });
}