const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
    {
    problemId:{
        type:String,
        required:true
    },
    language:{
        type:'enum',
        default:['Java','Python','C++'],
        required:true
    },
    result:{
        type:'enum',
        default:['Accepted','Time Limit Exceeded','Runtime Error','Compile Time Error','Wrong Answer'],
        required:true
    }
 },
{timestamps:true}
);

const Schema = mongoose.model('Schema',submissionSchema);
module.exports = Schema;