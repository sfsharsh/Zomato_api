const express = require('express');
const app = express();
const routes = app.use(express.Router());
const section = require('../controller/sectionItem_controller');
const { auth } = require('../middleware/auth');
const {upload} = require('../service/image');

routes.get('/getmenu',auth, section.getMenu);
routes.get('/getsectionbymenu/:id',auth, section.getSectionByMenu);
routes.post('/addsectionitem',auth,upload, section.addSectionItem);
routes.get('/getsectionitem',auth, section.getSectionItem);
routes.get('/getsectionitembyid/:id',auth, section.getSectionItemById);
routes.put('/updatesectionitem/:id',auth,upload, section.updateSectionItem);
routes.put('/changesectionitemstatus/:id',auth, section.changesectionitemstatus);
routes.delete('/deletesectionitem/:id',auth,section.deleteSectionItem);

exports.routes = routes;