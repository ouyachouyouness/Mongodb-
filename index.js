const mongose = require('mongoose');

mongose.connect('mongodb://localhost/brightcoding')
.then(() => console.log('Data base connected .. '))
.catch(err => console.error('db not connected ..'))



const courseSchema = new mongose.Schema({
    name : String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongose.model('Course', courseSchema )


async function getCourses(){
    const courses = await Course.find({author: 'younes'})

    console.log(courses);
}

getCourses()
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