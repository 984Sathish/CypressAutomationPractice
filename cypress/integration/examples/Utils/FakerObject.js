import { faker } from '@faker-js/faker';

class FakerObject{

    get role(){
        return faker.helpers.arrayElement(['Admin', 'ESS']).toString()
    }

    get status(){
        return faker.helpers.arrayElement(['Enabled', 'Disabled']).toString()
    }

    get maritalStatus(){
        return faker.helpers.arrayElement(['Single', 'Married', 'Other'])
    }

    get bloodType(){
        return faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    }
    
    get gender(){
        return faker.helpers.arrayElement(['Male','Female']).toString()
    }

    get jobTitle(){
        return faker.helpers.arrayElement(['Account Assistant', 'HR Manager', 'QA Lead', 'QA Engineer', 'Chief Financial Officer', 'Support Specialist'])
    }

    get jobCategory(){
        return faker.helpers.arrayElement(['Craft Workers', 'Professionals', 'Service Workers', 'Technicians', 'Officials and Managers', 'Operatives'])
    }

    get subUnit(){
        return faker.helpers.arrayElement(['Administration', 'Engineering', 'Development', 'Quality Assurance', 'Sales & Marketing', 'Technical Support'])
    }

    get location(){
        return faker.helpers.arrayElement(['Canadian Regional HQ', 'HQ - CA, USA', 'New York Sales Office', 'Texas R&D'])
    }

    get empStatus(){
        return faker.helpers.arrayElement(['Full-Time','Freelance', 'Full-Time Permanent', 'Part-Time Internship']).toString()
    }
    get leaveType(){
        return faker.helpers.arrayElement(['CAN - Matternity','CAN - Bereavement','CAN - FMLA', 'CAN - Vacation', 'CAN - Personal', 'US - Matternity','US - Bereavement','US - FMLA', 'US - Vacation', 'US - Personal']).toString()
    }

    get leaveDuration(){
        return faker.helpers.arrayElement(['Full Day', 'Half Day - Morning', 'Half Day - Afternoon'])
    }
    

}
export default FakerObject