// Mock data for the dashboard
const patientsData = [
  {
    id: "01",
    name: "Srikanth",
    gender: "Male",
    age: "27",
    email: "Srikanth@gmail.com",
    phone: "88994 88994",
    devices: "BP",
    deviceDetails: "Glucose, NIBP",
    provider: "Dr. Tejareddy",
    readings: "15/16",
    lastCollection: "03-03-2025",
    cycleEnd: "20-03-2025",
    lastBilling: "30-03-2025",
    readingStatus: "high",
  },
  {
    id: "01",
    name: "Erika",
    gender: "Female",
    age: "27",
    email: "erika@gmail.com",
    phone: "77895 24589",
    devices: "BP",
    deviceDetails: "Glucose, NIBP",
    provider: "Dr. Uma Devi",
    readings: "01/16",
    lastCollection: "03-03-2025",
    cycleEnd: "20-03-2025",
    lastBilling: "30-03-2025",
    readingStatus: "low",
  },
  {
    id: "01",
    name: "Dinesh",
    gender: "Male",
    age: "20",
    email: "dinesh@gmail.com",
    phone: "99452 36589",
    devices: "BP",
    deviceDetails: "Glucose, NIBP",
    provider: "Dr. Rethiksha",
    readings: "08/16",
    lastCollection: "03-03-2025",
    cycleEnd: "20-03-2025",
    lastBilling: "30-03-2025",
    readingStatus: "medium",
  },
  {
    id: "01",
    name: "Mahesh",
    gender: "Male",
    age: "29",
    email: "mahesh@gmail.com",
    phone: "88956 25698",
    devices: "BP",
    deviceDetails: "Glucose, NIBP",
    provider: "Dr. Dianand",
    readings: "01/16",
    lastCollection: "03-03-2025",
    cycleEnd: "20-03-2025",
    lastBilling: "30-03-2025",
    readingStatus: "high",
  },
  {
    id: "01",
    name: "Jeevitha",
    gender: "Female",
    age: "20",
    email: "jeevitha@gmail.com",
    phone: "88954 25698",
    devices: "BP",
    deviceDetails: "Glucose, NIBP",
    provider: "Dr. Reshma",
    readings: "08/16",
    lastCollection: "03-03-2025",
    cycleEnd: "20-03-2025",
    lastBilling: "30-03-2025",
    readingStatus: "medium",
  },
  {
    id: "01",
    name: "Anusha",
    gender: "Female",
    age: "29",
    email: "anusha@gmail.com",
    phone: "77458 58965",
    devices: "BP",
    deviceDetails: "Glucose, NIBP",
    provider: "Dr. Anand",
    readings: "01/16",
    lastCollection: "03-03-2025",
    cycleEnd: "20-03-2025",
    lastBilling: "30-03-2025",
    readingStatus: "high",
  },
];

// Available practices
const practices = [
  "All Practices",
  "Cardiology Center",
  "Family Medicine",
  "Internal Medicine",
  "Endocrinology",
];

// Available devices
const devices = [
  "All Devices",
  "BP",
  "Glucose",
  "NIBP",
  "ECG",
  "Pulse Oximeter",
];

/**
 * Fetch all patients
 * @returns {Promise<Array>} Array of patient objects
 */
export const fetchPatients = () => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(patientsData);
    }, 500);
  });
};

/**
 * Search patients based on filters
 * @param {Object} filters - Search filters
 * @returns {Promise<Array>} Filtered array of patient objects
 */
export const searchPatients = (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...patientsData];

      // Filter by patient name
      if (filters.patientName) {
        results = results.filter((patient) =>
          patient.name
            .toLowerCase()
            .includes(filters.patientName.toLowerCase()),
        );
      }

      // Filter by account (using ID as a proxy)
      if (filters.account) {
        results = results.filter((patient) =>
          patient.id.includes(filters.account),
        );
      }

      // Filter by device
      if (
        filters.device &&
        filters.device !== "Select device" &&
        filters.device !== "All Devices"
      ) {
        results = results.filter(
          (patient) =>
            patient.devices === filters.device ||
            patient.deviceDetails.includes(filters.device),
        );
      }

      // Filter by provider (practice)
      if (
        filters.practice &&
        filters.practice !== "Select practice" &&
        filters.practice !== "All Practices"
      ) {
        // This is a simplified example - in a real app, you'd have a proper mapping
        // between practices and providers
        const practiceProviderMap = {
          "Cardiology Center": ["Dr. Tejareddy", "Dr. Dianand"],
          "Family Medicine": ["Dr. Uma Devi", "Dr. Anand"],
          "Internal Medicine": ["Dr. Rethiksha"],
          Endocrinology: ["Dr. Reshma"],
        };

        const providers = practiceProviderMap[filters.practice] || [];
        if (providers.length > 0) {
          results = results.filter((patient) =>
            providers.includes(patient.provider),
          );
        }
      }

      resolve(results);
    }, 500);
  });
};

/**
 * Get available practices
 * @returns {Promise<Array>} Array of practice names
 */
export const getPractices = () => {
  return Promise.resolve(practices);
};

/**
 * Get available devices
 * @returns {Promise<Array>} Array of device names
 */
export const getDevices = () => {
  return Promise.resolve(devices);
};

/**
 * Get patient statistics
 * @returns {Promise<Object>} Object containing patient statistics
 */
export const getPatientStatistics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalPatients: patientsData.length,
        activePatients: patientsData.filter((p) => p.readingStatus === "high")
          .length,
        lowCompliance: patientsData.filter((p) => p.readingStatus === "low")
          .length,
        mediumCompliance: patientsData.filter(
          (p) => p.readingStatus === "medium",
        ).length,
      });
    }, 300);
  });
};

/**
 * Update patient data
 * @param {string} patientId - ID of the patient to update
 * @param {Object} updatedData - New patient data
 * @returns {Promise<Object>} Updated patient object
 */
export const updatePatient = (patientId, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real app, this would update a database
      // For this mock, we'll just return the updated data
      resolve({
        id: patientId,
        ...updatedData,
      });
    }, 500);
  });
};
