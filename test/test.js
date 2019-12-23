"use strict"

var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();
const expect = require('chai').expect;
 var request = require('supertest')
chai.use(chaiHttp);

var request = request("http://localhost:8083")


 describe('sponsors', function() {   
       describe('POST', function(){
    it('Should  insert json sponsors', function(done){
        request.post('/api/sponsors')
        .send({
            
            NameSponsor: "TELCEL",
            EmailSponsor:"test@mia.com",
            DescriptSponsor: "Duplicamos tus Megas Activa un Paquete Más Megas y disfruta del doble de Megas.",
            ImgSponsor: "C:/PATH",
            Sponsor: "Contrata un paquete Más Megas para ti o Más Megas para compartir a partir de 1000 MB y recibe por promoción, una cantidad de Megabytes (MB) adicional igual a la cantidad de MB incluidos en el paquete contratado, durante la vigencia del mismo",
            StatusSponsor: true,
            DateBeginSponsor: "2019-11-04T22:09:39.628Z",
            DateEndSponsor: "2019-11-04T22:09:39.629Z"
        })
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Should  not insert json sponsors why NameEvent is empty', function(done){
        request.post('/api/sponsors')
        .send({
            
            NameSponsor: "",
            EmailSponsor:"",
            DescriptSponsor: "Duplicamos tus Megas Activa un Paquete Más Megas y disfruta del doble de Megas.",
            ImgSponsor: "C:/PATH",
            Sponsor: "Contrata un paquete Más Megas para ti o Más Megas para compartir a partir de 1000 MB y recibe por promoción, una cantidad de Megabytes (MB) adicional igual a la cantidad de MB incluidos en el paquete contratado, durante la vigencia del mismo",
            StatusSponsor: true,
            DateBeginSponsor: "2019-11-04T22:09:39.628Z",
            DateEndSponsor: "2019-11-04T22:09:39.629Z"
        })
            .expect('Content-Type', /json/)
            .expect(500, done);
    });

    it('Should  not insert the sponsor why reques json sponsors  is empty', function(done){
        request.post('/api/sponsors')  
            .expect('Content-Type', /json/)
            .expect(500, done);
    });
});


describe('GET', function(){
    let id ="";
    it('Should return json as default data format', function(done){
        request.get('/api/sponsors')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it("should get a single user_email record", (done) => {                      
        //  request.get('api/users/email'+`/${valor}`) 
          request.get('/api/sponsors/email/test@mia.com')
           .expect('Content-Type', /json/)
           .end( function(err,res){
               id=res.body.data._id
               console.log("el valor "+ id)
               done();
              });          
           });   


    it("should not get a single sponsors record", (done) => {
       request.get('/api/sponsors/123')
       .expect('Content-Type', /json/)
       .expect(404, done);
            });


            it("should get a single sponsors record", (done) => {
               request.get('/api/sponsors'+`/${id}`)  
               .expect('Content-Type', /json/)
               .expect(200, done);
                    });                      

});





describe('put', function(){
let id ="";
it("should get a single user_email record", (done) => {                      
    //  request.get('api/users/email'+`/${valor}`) 
      request.get('/api/sponsors/email/test@mia.com')
       .expect('Content-Type', /json/)
       .end( function(err,res){
           id=res.body.data._id
           console.log("el valor "+ id)
           done();
          });          
       });   

it('Should  insert json sponsors', function(done){
   request.put('/api/sponsors'+`/${id}`)
   .send({
       
       NameSponsor: "TELCEL",
       EmailSponsor:"test@mia.com",
       DescriptSponsor: "Duplicamos tus Megas Activa un Paquete Más Megas y disfruta del doble de Megas.",
       ImgSponsor: "C:/PATH",
       Sponsor: "Contrata un paquete Más Megas para ti o Más Megas para compartir a partir de 1000 MB y recibe por promoción, una cantidad de Megabytes (MB) adicional igual a la cantidad de MB incluidos en el paquete contratado, durante la vigencia del mismo",
       StatusSponsor: true,
       DateBeginSponsor: "2019-11-04T22:09:39.628Z",
       DateEndSponsor: "2019-11-04T22:09:39.629Z"
   })
  
       .expect('Content-Type', /json/)
       .expect(200, done);
});

it('Should  insert json sponsors', function(done){

   request.put('/api/sponsors/123')

   .send({
       
       NameSponsor: "TELCEL",
       EmailSponsor:"faraond1@gmail.com",
       DescriptSponsor: "Duplicamos tus Megas Activa un Paquete Más Megas y disfruta del doble de Megas.",
       ImgSponsor: "C:/PATH",
       Sponsor: "Contrata un paquete Más Megas para ti o Más Megas para compartir a partir de 1000 MB y recibe por promoción, una cantidad de Megabytes (MB) adicional igual a la cantidad de MB incluidos en el paquete contratado, durante la vigencia del mismo",
       StatusSponsor: true,
       DateBeginSponsor: "2019-11-04T22:09:39.628Z",
       DateEndSponsor: "2019-11-04T22:09:39.629Z"
   })
       .expect('Content-Type', /json/)
       .expect(404, done);
});

});


describe('delete', function(){

let id ="";

it("should get a single sponsor_email record", (done) => {                      

      request.get('/api/sponsors/email/test@mia.com')
       .expect('Content-Type', /json/)
       .end( function(err,res){
           id=res.body.data._id
           console.log("el valor "+ id)
           done();
          });          
       });   

it('Should  remove json sponsors', function(done){
 request.delete('/api/sponsors'+`/${id}`)
 .expect('Content-Type', /json/)
       .expect(200, done);
});
it('Should  remove json sponsors', function(done){
    request.delete('/api/sponsors/1234')
   .expect('Content-Type', /json/)
   .expect(404, done);
 });

it('Should  remove json sponsors', function(done){
    console.log(id)
    request.delete('/api/sponsors'+`/${id}`)
   .expect('Content-Type', /json/)
   .expect(500, done);
 });
});


//la funcion sponsors
});