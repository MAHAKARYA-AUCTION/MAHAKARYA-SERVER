const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
let transporter = nodemailer.createTransport({
	service: "gmail",
  auth: {
    user: 'mahakaryaauction@gmail.com',
    pass: 'finalprojectp3!',
  },
});
const handlebars = {
	viewEngine:{
		extName:'.handlebars',
		partialsDir:'./views',
		defaultLayout:false
	},
	viewPath:'./views',
	extName:'.handlebars'
}

transporter.use('compile',hbs(handlebars))

module.exports={
    transporter,
}