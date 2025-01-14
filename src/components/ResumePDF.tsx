import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contact: {
    fontSize: 10,
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
  },
});

interface ResumePDFProps {
  data: {
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      linkedin: string;
      github: string;
    };
    education: Array<{
      institution: string;
      degree: string;
      location: string;
      date: string;
    }>;
    experience: Array<{
      position: string;
      company: string;
      location: string;
      date: string;
      accomplishments: string[];
    }>;
  };
}

const ResumePDF = ({ data }: ResumePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.contact}>
          {data.personalInfo.email} | {data.personalInfo.phone}
        </Text>
        <Text style={styles.contact}>
          {data.personalInfo.linkedin} | {data.personalInfo.github}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.content}>
            <Text>{edu.institution} - {edu.location}</Text>
            <Text>{edu.degree} - {edu.date}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={styles.content}>
            <Text>{exp.position} at {exp.company} - {exp.location}</Text>
            <Text>{exp.date}</Text>
            {exp.accomplishments.map((acc, i) => (
              <Text key={i}>• {acc}</Text>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
