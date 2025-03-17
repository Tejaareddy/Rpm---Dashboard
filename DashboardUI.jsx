import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { fetchPatients, searchPatients } from "./DashboardBackend";

// Status Badge Component
const StatusBadge = ({ type, text }) => {
  let badgeStyle;
  let textStyle;

  switch (type) {
    case "success":
      badgeStyle = styles.successBadge;
      textStyle = styles.successText;
      break;
    case "warning":
      badgeStyle = styles.warningBadge;
      textStyle = styles.warningText;
      break;
    case "error":
      badgeStyle = styles.errorBadge;
      textStyle = styles.errorText;
      break;
    default:
      badgeStyle = styles.successBadge;
      textStyle = styles.successText;
  }

  return (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={[styles.badgeText, textStyle]}>{text}</Text>
    </View>
  );
};

// Header Component
const DashboardHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdown}>
            <View>
              <Text style={styles.dropdownText}>RPM onboarding status</Text>
            </View>
            <View>
              <Text style={styles.dropdownText}>RPM onboarding status</Text>
            </View>
          </View>
          <View style={styles.dropdownIconContainer}>
            <View style={styles.dropdownIcon} />
          </View>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <View style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <View style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <View style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Search Filters Component
const SearchFilters = ({ onSearch }) => {
  const [patientName, setPatientName] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [regPatient, setRegPatient] = React.useState("");
  const [practice, setPractice] = React.useState("Select practice");
  const [device, setDevice] = React.useState("Select device");

  const handleSearch = () => {
    onSearch({
      patientName,
      account,
      dob,
      regPatient,
      practice,
      device,
    });
  };

  return (
    <View style={styles.filtersContainer}>
      <TextInput
        placeholder="Patient"
        style={styles.input}
        value={patientName}
        onChangeText={setPatientName}
      />
      <TextInput
        placeholder="Account"
        style={styles.input}
        value={account}
        onChangeText={setAccount}
      />
      <TextInput
        placeholder="DOB"
        style={styles.input}
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        placeholder="Reg Patient"
        style={styles.input}
        value={regPatient}
        onChangeText={setRegPatient}
      />
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>{practice}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>{device}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

// Table Header Component
const TableHeader = () => {
  return (
    <View style={styles.headerRow}>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>MPI</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Patient</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Email</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Device</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Provider</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Readings</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Last Collection</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Cycle end</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Last billing</Text>
      </View>
    </View>
  );
};

// Patient Row Component
const PatientRow = ({ patient }) => {
  const {
    id,
    name,
    gender,
    age,
    email,
    phone,
    devices,
    deviceDetails,
    provider,
    readings,
    lastCollection,
    cycleEnd,
    lastBilling,
    readingStatus,
  } = patient;

  let statusType;
  switch (readingStatus) {
    case "high":
      statusType = "success";
      break;
    case "medium":
      statusType = "warning";
      break;
    case "low":
      statusType = "error";
      break;
    default:
      statusType = "success";
  }

  return (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{id}</Text>
      </View>
      <View style={styles.cell}>
        <View>
          <Text style={styles.cellText}>{name}</Text>
        </View>
        <View>
          <Text style={styles.cellSubtext}>{`${gender} ${age}`}</Text>
        </View>
      </View>
      <View style={styles.cell}>
        <View>
          <Text style={styles.cellText}>{email}</Text>
        </View>
        <View>
          <Text style={styles.cellSubtext}>{phone}</Text>
        </View>
      </View>
      <View style={styles.cell}>
        <View>
          <Text style={styles.cellText}>{devices}</Text>
        </View>
        <View>
          <Text style={styles.cellSubtext}>{deviceDetails}</Text>
        </View>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{provider}</Text>
      </View>
      <View style={styles.cell}>
        <StatusBadge type={statusType} text={readings} />
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{lastCollection}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{cycleEnd}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{lastBilling}</Text>
      </View>
    </View>
  );
};

// Patient Table Component
const PatientTable = ({ patients }) => {
  return (
    <View style={styles.tableContainer}>
      <ScrollView horizontal>
        <View style={styles.table}>
          <TableHeader />
          <View>
            {patients.map((patient, index) => (
              <PatientRow key={index} patient={patient} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [patients, setPatients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        const data = await fetchPatients();
        setPatients(data);
        setError(null);
      } catch (err) {
        setError("Failed to load patients data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      const filteredPatients = await searchPatients(filters);
      setPatients(filteredPatients);
      setError(null);
    } catch (err) {
      setError("Failed to search patients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <DashboardHeader />
          <SearchFilters onSearch={handleSearch} />

          {loading ? (
            <View style={styles.loadingContainer}>
              <Text>Loading patients data...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <PatientTable patients={patients} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    fontFamily: "Inter, sans-serif",
  },
  content: {
    padding: 24,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  titleContainer: {},
  title: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 32,
    paddingTop: 8,
    paddingBottom: 8,
  },
  dropdownText: {
    fontSize: 14,
    color: "#374151",
  },
  dropdownIconContainer: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  dropdownIcon: {
    width: 20,
    height: 20,
    backgroundColor: "transparent",
  },
  iconButton: {
    padding: 8,
    borderRadius: 6,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    backgroundColor: "transparent",
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    minWidth: 200,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    color: "#374151",
  },
  searchButton: {
    backgroundColor: "#f97316",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  tableContainer: {
    width: "100%",
  },
  table: {
    minWidth: "100%",
  },
  headerRow: {
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
  },
  headerCell: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  row: {
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
  },
  cell: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  cellText: {
    fontSize: 14,
    color: "#374151",
  },
  cellSubtext: {
    fontSize: 12,
    color: "#6b7280",
  },
  badge: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
  },
  successBadge: {
    backgroundColor: "#dcfce7",
  },
  successText: {
    color: "#166534",
  },
  warningBadge: {
    backgroundColor: "#fef9c3",
  },
  warningText: {
    color: "#854d0e",
  },
  errorBadge: {
    backgroundColor: "#fee2e2",
  },
  errorText: {
    color: "#991b1b",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorContainer: {
    padding: 20,
    backgroundColor: "#fee2e2",
    borderRadius: 6,
    marginBottom: 20,
  },
  errorText: {
    color: "#991b1b",
  },
});

export default Dashboard;
