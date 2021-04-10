const { Router } = require('express');
const route = Router();
const upload = require('../../config/multer');
const { File } = require('../../models').models;
var stream = require('stream');
var {Readable} = require('stream');

module.exports = (router) => {
    router.use('/api/file', route);

    route.post('/upload', upload.single('file'), (req, res) => {
        File.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: req.file.buffer,
        })
            .then(() => {
                res.json({
                    msg:
                        'File uploaded successfully! -> filename = ' +
                        req.file.originalname,
                });
            })
            .catch((err) => {
                console.log(err);
                res.json({ msg: 'Error', detail: err });
            });
    });

    route.get('/info', (req, res) => {
        File.findAll({ attributes: ['id', 'name'] })
            .then((files) => {
                res.json(files);
            })
            .catch((err) => {
                console.log(err);
                res.json({ msg: 'Error', detail: err });
            });
    });

    route.get('/:id', (req, res) => {
        File.findByPk(req.params.id)
            .then((file) => {
                var readable = Readable.from(file.data, 'base64');
                var pass = new stream.PassThrough();
                // readStream.end(fileContents) 

                // res.set(
                //     'Content-disposition',
                //     'attachment; filename=' + file.name
                // );
                res.set(
                    'Content-disposition',
                    'inline; filename=' + file.name
                );
                res.set('Content-Type', file.type);

                console.log(res)
                // return res.status(200).json({user: "reynard"})
                // console.log("==============================================================================================================================================")
                pass.pipe(readable).pipe(res);
                // console.log(res)
            })
            .catch((err) => {
                console.log(err);
                res.json({ msg: 'Error', detail: err });
            });
    });
};
