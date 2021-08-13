const mongose = require('mongoose');

mongose.connect('mongodb://localhost/brightcoding', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Data base connected .. '))
.catch(err => console.error('db not connected ..'))



const courseSchema = new mongose.Schema({
    name : {
        type : String, 
        required : true,
        minlength: 5,
        maxlength: 100,
        //match: /pattern/
     },
    author: {
        type: String,
        uppercase: true,
        trim: true
    },
    tags: {
        type: Array,
        validate: {
            validator: function(v){
                return v && v.length > 0
            },
            message: "Course should have at least one tag"
        }
    },
    category: {
        type: String,
        enum: ['Computer', 'Dev', 'Mobile']
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price : { 
            type : Number,
             required: function(){return this.isPublished},
             min:10,
             max:120,
             set: v => Math.round(v),
             get: v => Math.round(v)
    }
})

const Course = mongose.model('Course', courseSchema )



//eq
//ne
//gt(great than)
//gte (greater than or equel to)
//lt (less than)
//lte (less than or equal to)
//in
// nin (not in)

async function createCourse(){

    const course = new Course({
        name : 'Learn angular',
        author: 'sara ouyachou',
        tags: ['angular'],
        category: 'Dev',
        isPublished: true,
        price:20
        
    })
    try{
        const result = await course.save();
        console.log(result);

    }catch(ex){
        let errors = {};
        for(filed in ex.errors){
            errors[filed] = ex.errors[filed].message
        }
        console.log(errors);
    }

}
createCourse()



async function updateCourse(id){
    // let course = await Course.findById(id);
    // course.name = "Learn nod js from "
    // course.author = "loubna ouyachou"

    // let result = await course.save()

    let result = await Course.findByIdAndUpdate({_id: id}, {
        $set: {
            name: 'Learn Vue js',
            isPublished: false
        },  new : true
    })
    console.log(result);
}

//updateCourse('6105df4195d49912e828dce1')



async function getCourses(){

    pageNumber = 1;
    pageSize = 10;
    const courses = await Course
    // .find({ price: { 
    //     $gt: 10,
    //     $lt: 20
    // }})
    //.find({ price : {$nin : [10, 50, 100]}})
    // .find()
    // .and([{author : 'Younes'}, {isPublished: true}])
    // .or([])
    //comence avec Younes 
    //.find({ author : /^Ahmed/ })

    //.find({author: /Ouyachou$/i})
    //contient une chaine de caractere 
    .find({ author: /.*ouya.*/i})
    //
    //.select({name: 1, isPublished: 1, date: 1, _id:0})
    .sort({ name: -1})
    .skip((pageNumber - 1)* pageSize)
    .limit(pageSize)

    console.log(courses);
}

//getCourses()
// async function createCourse(){
    
// const course = new Course({
//     name: 'Angular',
//     author: 'Younes',
//     tags: ['nodejs', 'javascript', 'froented'],
//     isPublished: false
// })

// const result = await course.save();
// console.log(result);

// }

// createCourse()
