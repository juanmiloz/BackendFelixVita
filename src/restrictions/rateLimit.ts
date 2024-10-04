import rateLimit from 'express-rate-limit'
import { title } from 'process';


const messageError = {
	title:'To much request',
	message:'Too many requests from this IP, please try again after a minute'
}

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minute).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: messageError
});



export default limiter;