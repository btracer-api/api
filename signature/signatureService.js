const Signature = require('./signature')
const moment = require('moment')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Signature.methods(['get', 'post', 'put'])

Signature.updateOptions({ new: true, runValidators: true })

Signature.before('get', passport.authenticate('jwt', { session: false }))
    .before('post', passport.authenticate('jwt', { session: false }))
    .before('put', passport.authenticate('jwt', { session: false }))

// New Method to List Demanded for Current Date == Time Fance 2 Ahead
Signature.route('demand.get', function (req, res, next) {

    const drefd = moment().add(2, 'days').format('YYYY/MM/DD');
    // console.log('drefd=>' + drefd)
    const options = {
        allowDiskUse: true
    }
    const pipeline = [
        {
            "$match": {
                "dneeded": drefd
            }
        },
        {
            "$group": {
                "_id": {
                    "roasttype": "$roasttype",
                    "grindtype": "$grindtype",
                    "graintype": "$graintype"
                },
                "SUM(quantityVol)": {
                    "$sum": "$quantityVol"
                }
            }
        },
        {
            "$project": {
                "roasttype": "$_id.roasttype",
                "grindtype": "$_id.grindtype",
                "graintype": "$_id.graintype",
                "qtde": "$SUM(quantityVol)",
                "_id": 0
            }
        }
    ]

    Signature.aggregate(pipeline,
        function (err, demands) {
            if (err) {
                return res.json({ success: false, msg: 'Erro ao baixar demandas. Detalhe:' + err })
            }
            res.json(demands)
        }
    )
});
// ******************************************************************
module.exports = Signature