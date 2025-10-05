import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 3 characters'],
        maxlength: [100, 'Name must be at most 100 characters'],

    },
    price:{
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be at least 0'],
        max: [10000, 'Price must be at most 10000'],
        validate: {
            validator: function(v) {
                return v >= 0;  // Price must be non-negative  
            },
        }
    }, 
    currency:{
        type: String,
        enum:['USD', 'EUR', 'DH'],
        default: 'DH',
    },
    frequency:{
        type: String,
        enum:['daily','weekly','monthly', 'yearly'],
        default: 'monthly',
    },
    category:{
        type: String,
        enum:['technology','entertainment','education','productivity', 'other'],
        default: 'technology',
        required: [true, 'Category is required'],
    },
    paymentMethod:{
        type: String,
        enum:['active','cancelled','expired'],
        default: 'active',
    },
    startDate:{
        type: Date,
        required: [true, 'Start Date is required'],
        validate: {
            validator: function(v) {
                return v >= this.startDate;  // Renewal date must be after the start date
            },
            message: 'Start date cannot be in the future'
        }
    },
    renewalDate:{
        type: Date,
        validate: {
            validator: function(v) {
                return v >= this.startDate;  // Start date cannot be in the future
            },
            message: 'Renewal date must be after the start date',
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        index: true,
    }

}, {timestamps: true});

//Auto-calculate renewal date if missing
subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            'daily': 1,
            'weekly': 7,
            'monthly': 30,
            'yearly': 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    } if(this.renewalDate < this.startDate) {
        return next(new Error('Renewal date must be after the start date'));
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;