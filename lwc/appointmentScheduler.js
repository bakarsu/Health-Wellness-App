import { LightningElement, wire, track } from 'lwc';
import getUpcomingAppointments from '@salesforce/apex/AppointmentManager.getUpcomingAppointments';
import bookAppointment from '@salesforce/apex/AppointmentManager.bookAppointment';

export default class AppointmentScheduler extends LightningElement {
    @track appointments;
    @track newAppointmentDate = '';

    // Wire method to fetch upcoming appointments
    @wire(getUpcomingAppointments)
    wiredAppointments({ error, data }) {
        if (data) {
            this.appointments = data;
        } else if (error) {
            console.error('Error fetching appointments: ', error);
        }
    }

    // Handler to book a new appointment
    handleBookAppointment() {
        bookAppointment({ appointmentDate: this.newAppointmentDate })
            .then(() => {
                console.log('Appointment booked successfully');
                return refreshApex(this.appointments);
            })
            .catch(error => {
                console.error('Error booking appointment: ', error);
            });
    }

    handleDateChange(event) {
        this.newAppointmentDate = event.target.value;
    }
}
