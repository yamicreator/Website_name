const grade_url = 'https://anteaterapi.com/v2/rest/grades/aggregateByCourse';
const course_url = 'https://anteaterapi.com/v2/rest/courses/';

async function get_data(url)
{
    const options = {method: 'GET'};
    try 
    {
        const response = await fetch(grade_url, options);
        const data = await response.json();
        console.log(data);
    }    
    catch (error) 
    {
        console.error(error);
    }
}

function parse_data(grade_data, course_data)
{
    if (data["ok"] === true)
    {
        for(let i = 0; i<5; i++)
        {
            if (data["data"][i]["averageGPA"] != null)
            {
                temp_url = new URL(course_url);
                temp_url.append("department", data["data"][i]["department"]);
                temp_url.append("courseNumber", data["data"][i]["courseNumber"]);
                console.log(temp_url);
            }
        
        }
    }
 
}

get_data()