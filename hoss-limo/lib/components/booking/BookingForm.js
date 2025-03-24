"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const formik_1 = require("formik");
const Yup = __importStar(require("yup"));
const useAuth_1 = require("../../hooks/useAuth");
const reservationService_1 = require("../../services/reservationService");
const app_1 = require("@firebase/app"); // Import FirebaseError type
const vehicleTypes = [
    { id: 'sedan', name: 'Luxury Sedan', capacity: 3 },
    { id: 'suv', name: 'Executive SUV', capacity: 6 },
    { id: 'limo', name: 'Stretch Limousine', capacity: 8 },
    { id: 'van', name: 'Luxury Van', capacity: 12 },
];
const BookingForm = ({ onSuccess }) => {
    const { user } = (0, useAuth_1.useAuth)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(null);
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };
    const formik = (0, formik_1.useFormik)({
        initialValues: {
            pickupLocation: '',
            dropoffLocation: '',
            pickupDate: getTomorrowDate(),
            pickupTime: '10:00',
            vehicleType: 'sedan',
            passengers: 1,
            specialRequests: '',
        },
        validationSchema: Yup.object({
            pickupLocation: Yup.string().required('Pickup location is required'),
            dropoffLocation: Yup.string().required('Drop-off location is required'),
            pickupDate: Yup.date()
                .required('Pickup date is required')
                .min(new Date(), 'Date must be in the future'),
            pickupTime: Yup.string().required('Pickup time is required'),
            vehicleType: Yup.string().required('Vehicle type is required'),
            passengers: Yup.number()
                .required('Number of passengers is required')
                .positive('Number of passengers must be positive')
                .integer('Number of passengers must be a whole number')
                .max(12, 'Maximum 12 passengers allowed'),
        }),
        onSubmit: (values) => __awaiter(void 0, void 0, void 0, function* () {
            if (!user) {
                setErrorMessage('You must be logged in to book a ride');
                return;
            }
            setIsLoading(true);
            setErrorMessage(null);
            try {
                // Force token refresh to ensure a valid authentication token
                yield user.getIdToken(true);
                const reservationData = {
                    userId: user.uid,
                    pickupLocation: values.pickupLocation,
                    dropoffLocation: values.dropoffLocation,
                    pickupDate: values.pickupDate,
                    pickupTime: values.pickupTime,
                    vehicleType: values.vehicleType,
                    passengers: values.passengers,
                    specialRequests: values.specialRequests,
                    status: 'pending',
                };
                const reservationId = yield (0, reservationService_1.createReservation)(reservationData);
                onSuccess(reservationId);
            }
            catch (error) {
                // Enhanced error logging with type narrowing
                console.error('Error creating reservation:', error);
                if (error instanceof app_1.FirebaseError) {
                    console.error('Error code:', error.code);
                    console.error('Error message:', error.message);
                    setErrorMessage(`Failed to create reservation: ${error.message}`);
                }
                else if (error instanceof Error) {
                    console.error('Error message:', error.message);
                    setErrorMessage(`Failed to create reservation: ${error.message}`);
                }
                else {
                    console.error('Unknown error:', error);
                    setErrorMessage('Failed to create reservation. Please try again.');
                }
            }
            finally {
                setIsLoading(false);
            }
        }),
    });
    const selectedVehicle = vehicleTypes.find((v) => v.id === formik.values.vehicleType);
    return (<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 bg-white p-8 rounded-2xl shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Book Your Luxury Ride</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Reserve your premium transportation with Hoss Limo.
          </p>
        </div>

        {errorMessage && (<div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {errorMessage}
          </div>)}

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup Location */}
            <div>
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
                Pickup Location*
              </label>
              <input id="pickupLocation" name="pickupLocation" type="text" placeholder="Enter address" className={`w-full px-4 py-3 border ${formik.touched.pickupLocation && formik.errors.pickupLocation
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 transition-colors`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pickupLocation} required/>
              {formik.touched.pickupLocation && formik.errors.pickupLocation && (<p className="mt-1 text-sm text-red-500">{formik.errors.pickupLocation}</p>)}
            </div>

            {/* Dropoff Location */}
            <div>
              <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700">
                Drop-off Location*
              </label>
              <input id="dropoffLocation" name="dropoffLocation" type="text" placeholder="Enter address" className={`w-full px-4 py-3 border ${formik.touched.dropoffLocation && formik.errors.dropoffLocation
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 transition-colors`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.dropoffLocation} required/>
              {formik.touched.dropoffLocation && formik.errors.dropoffLocation && (<p className="mt-1 text-sm text-red-500">{formik.errors.dropoffLocation}</p>)}
            </div>

            {/* Pickup Date */}
            <div>
              <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">
                Pickup Date*
              </label>
              <input id="pickupDate" name="pickupDate" type="date" className={`w-full px-4 py-3 border ${formik.touched.pickupDate && formik.errors.pickupDate
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 transition-colors`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pickupDate} min={getTomorrowDate()} required/>
              {formik.touched.pickupDate && formik.errors.pickupDate && (<p className="mt-1 text-sm text-red-500">{formik.errors.pickupDate}</p>)}
            </div>

            {/* Pickup Time */}
            <div>
              <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">
                Pickup Time*
              </label>
              <input id="pickupTime" name="pickupTime" type="time" className={`w-full px-4 py-3 border ${formik.touched.pickupTime && formik.errors.pickupTime
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 transition-colors`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pickupTime} required/>
              {formik.touched.pickupTime && formik.errors.pickupTime && (<p className="mt-1 text-sm text-red-500">{formik.errors.pickupTime}</p>)}
            </div>

            {/* Vehicle Type */}
            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
                Vehicle Type*
              </label>
              <select id="vehicleType" name="vehicleType" className={`w-full px-4 py-3 border ${formik.touched.vehicleType && formik.errors.vehicleType
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 transition-colors`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.vehicleType} required>
                {vehicleTypes.map((vehicle) => (<option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} (up to {vehicle.capacity} passengers)
                  </option>))}
              </select>
              {formik.touched.vehicleType && formik.errors.vehicleType && (<p className="mt-1 text-sm text-red-500">{formik.errors.vehicleType}</p>)}
            </div>

            {/* Number of Passengers */}
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
                Number of Passengers*
              </label>
              <input id="passengers" name="passengers" type="number" min="1" max={(selectedVehicle === null || selectedVehicle === void 0 ? void 0 : selectedVehicle.capacity) || 12} className={`w-full px-4 py-3 border ${formik.touched.passengers && formik.errors.passengers
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 transition-colors`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passengers} required/>
              {formik.touched.passengers && formik.errors.passengers && (<p className="mt-1 text-sm text-red-500">{formik.errors.passengers}</p>)}
              {selectedVehicle && formik.values.passengers > selectedVehicle.capacity && (<p className="mt-1 text-sm text-orange-500">
                  This vehicle only accommodates up to {selectedVehicle.capacity} passengers. Please select a larger vehicle or reduce the number of passengers.
                </p>)}
            </div>
          </div>

          {/* Special Requests */}
          <div className="mt-6">
            <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">
              Special Requests (Optional)
            </label>
            <textarea id="specialRequests" name="specialRequests" rows={4} placeholder="Any special requirements or requests?" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.specialRequests}/>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (<svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>) : null}
              {isLoading ? 'Submitting...' : 'Complete Reservation'}
            </button>
          </div>
        </form>
      </div>
    </div>);
};
exports.default = BookingForm;
