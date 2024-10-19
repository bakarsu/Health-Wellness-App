public class AppointmentManager {
    
    // Method to book an appointment
    public static Appointment__c bookAppointment(String userId, Date appointmentDate) {
        Appointment__c newAppointment = new Appointment__c();
        newAppointment.User__c = userId;
        newAppointment.Appointment_Date__c = appointmentDate;
        insert newAppointment;
        return newAppointment;
    }

    // Method to cancel an appointment
    public static void cancelAppointment(Id appointmentId) {
        Appointment__c appt = [SELECT Id FROM Appointment__c WHERE Id = :appointmentId LIMIT 1];
        delete appt;
    }

    // Method to get all upcoming appointments for a user
    public static List<Appointment__c> getUpcomingAppointments(Id userId) {
        return [SELECT Id, Appointment_Date__c FROM Appointment__c WHERE User__c = :userId AND Appointment_Date__c >= TODAY];
    }
}
