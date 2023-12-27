const express = require('express');
const app = express();
const routes = app.use(express.Router());
const section = require('../controller/section_controller');
const {upload} = require('../service/image');
const { auth } = require('../middleware/auth');

routes.get('/getmenu',auth, section.getMenu);
routes.post('/addsection',auth,upload, section.addSection);
routes.get('/getsection',auth, section.getSection);
routes.get('/getsectionbyid/:id',auth, section.getSectionById);
routes.put('/updatesection/:id',auth,upload, section.updateSection);
routes.put('/changesectionstatus/:id',auth, section.changesectionstatus);
routes.delete('/deletesection/:id',auth,section.deleteSection);

exports.routes = routes;