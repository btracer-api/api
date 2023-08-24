const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')

const customerTypeSchema = new mongoose.Schema(
  {
    nome: { type: String },
    email: { type: String, required: "A eMail for customer is needed!" },
    celular: { type: String },
    cpf: { type: String, required: "Favor, informar um CPF válido" },
    cep: { type: String, required: "Favor, informar um CEP!" },
    endereco1: { type: String, required: "Favor, fornecer um endereço!" },
    endereco2: { type: String },
    enderecoNo: { type: String },
    city: { type: String },
    uf: { type: String },
    comments: { type: String },
    PSPReference: { type: String },
    cafeMoido: { type: Boolean },
    modoPreparo: {
      type: String,
      enum: ["V60", "Coador de Papel", "Prensa Francesa", "Não informado"],
    },
    aceitaNewsletter: { type: Boolean },
    usage: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

customerTypeSchema.plugin(mongooseLogs, {
    schemaName: "customer",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('cu01', customerTypeSchema)