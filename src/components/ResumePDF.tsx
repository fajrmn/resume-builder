import React from 'react';
import { Document, Page, StyleSheet, Text, View, Svg, Path } from '@react-pdf/renderer';
import { ResumeData } from '../types';
import { PDFStyles } from '../config/styles';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: PDFStyles.fonts.body,
    color: PDFStyles.colors.secondary,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: PDFStyles.sizes.h1,
    color: PDFStyles.colors.primary,
    fontFamily: PDFStyles.fonts.heading,
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  contactText: {
    fontSize: PDFStyles.sizes.body,
    color: PDFStyles.colors.secondary,
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: PDFStyles.sizes.h2,
    color: PDFStyles.colors.secondary,
    fontFamily: PDFStyles.fonts.heading,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: PDFStyles.colors.accent,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemLeft: {
    flex: 1,
  },
  itemRight: {
    textAlign: 'right',
    minWidth: 120,
  },
  itemTitle: {
    fontSize: PDFStyles.sizes.body,
    fontFamily: PDFStyles.fonts.heading,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: PDFStyles.sizes.body,
    marginBottom: 2,
  },
  bulletPoint: {
    marginLeft: 12,
    fontSize: PDFStyles.sizes.body,
  },
});

// SVG icons as components
const EmailIcon = () => (
  <Svg style={styles.icon} viewBox="0 0 24 24">
    <Path
      fill={PDFStyles.colors.secondary}
      d="M20,4H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V6C22,4.895,21.105,4,20,4z M20,8.236l-8,4.882 L4,8.236V6h16V8.236z"
    />
  </Svg>
);

const PhoneIcon = () => (
  <Svg style={styles.icon} viewBox="0 0 24 24">
    <Path
      fill={PDFStyles.colors.secondary}
      d="M20,15.5C18.8,15.5,17.5,15.3,16.4,14.9C16.3,14.9,16.2,14.9,16.1,14.9C15.8,14.9,15.6,15,15.4,15.2L13.2,17.4C10.4,15.9,8,13.6,6.6,10.8L8.8,8.6C9.1,8.3,9.2,7.9,9,7.6C8.7,6.5,8.5,5.2,8.5,4C8.5,3.5,8,3,7.5,3H4C3.5,3,3,3.5,3,4C3,13.4,10.6,21,20,21C20.5,21,21,20.5,21,20V16.5C21,16,20.5,15.5,20,15.5Z"
    />
  </Svg>
);

const LinkedInIcon = () => (
  <Svg style={styles.icon} viewBox="0 0 24 24">
    <Path
      fill={PDFStyles.colors.secondary}
      d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9 V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977 C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z"
    />
  </Svg>
);

const GithubIcon = () => (
  <Svg style={styles.icon} viewBox="0 0 24 24">
    <Path
      fill={PDFStyles.colors.secondary}
      d="M12,2C6.477,2,2,6.477,2,12c0,4.419,2.865,8.166,6.839,9.489c0.5,0.09,0.682-0.218,0.682-0.484 c0-0.236-0.009-0.866-0.014-1.699c-2.782,0.602-3.369-1.34-3.369-1.34c-0.455-1.157-1.11-1.465-1.11-1.465 c-0.909-0.62,0.069-0.608,0.069-0.608c1.004,0.071,1.532,1.03,1.532,1.03c0.891,1.529,2.341,1.089,2.91,0.833 c0.091-0.647,0.349-1.086,0.635-1.337c-2.22-0.251-4.555-1.111-4.555-4.943c0-1.091,0.39-1.984,1.029-2.683 C6.546,8.54,6.202,7.524,6.746,6.148c0,0,0.84-0.269,2.75,1.025C10.295,6.95,11.15,6.84,12,6.836 c0.85,0.004,1.705,0.114,2.504,0.336c1.909-1.294,2.748-1.025,2.748-1.025c0.546,1.376,0.202,2.394,0.1,2.646 c0.64,0.699,1.026,1.591,1.026,2.683c0,3.841-2.337,4.687-4.565,4.935c0.359,0.307,0.679,0.917,0.679,1.852 c0,1.335-0.012,2.415-0.012,2.741c0,0.269,0.18,0.579,0.688,0.481C19.138,20.161,22,16.416,22,12C22,6.477,17.523,2,12,2z"
    />
  </Svg>
);

const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with contact info */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <View style={styles.contactRow}>
          {data.personalInfo.email && (
            <View style={styles.contactItem}>
              <EmailIcon />
              <Text style={styles.contactText}>{data.personalInfo.email}</Text>
            </View>
          )}
          {data.personalInfo.phone && (
            <View style={styles.contactItem}>
              <PhoneIcon />
              <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
            </View>
          )}
          {data.personalInfo.linkedin && (
            <View style={styles.contactItem}>
              <LinkedInIcon />
              <Text style={styles.contactText}>{data.personalInfo.linkedin}</Text>
            </View>
          )}
          {data.personalInfo.github && (
            <View style={styles.contactItem}>
              <GithubIcon />
              <Text style={styles.contactText}>{data.personalInfo.github}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education?.map((edu, i) => (
          <View key={i} style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemTitle}>{edu.institution}</Text>
              <Text style={styles.itemSubtitle}>{edu.degree}</Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.itemSubtitle}>{edu.location}</Text>
              <Text style={styles.itemSubtitle}>{edu.date}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience?.map((exp, i) => (
          <View key={i} style={[styles.itemRow, { marginBottom: 12 }]}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemTitle}>{exp.position}</Text>
              <Text style={styles.itemSubtitle}>{exp.company}</Text>
              {exp.accomplishments.map((acc, j) => (
                <Text key={j} style={styles.bulletPoint}>• {acc}</Text>
              ))}
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.itemSubtitle}>{exp.location}</Text>
              <Text style={styles.itemSubtitle}>{exp.date}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((project, i) => (
            <View key={i} style={[styles.itemRow, { marginBottom: 12 }]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemTitle}>{project.name}</Text>
                <Text style={styles.itemSubtitle}>{project.technologies}</Text>
                {project.accomplishments.map((acc, j) => (
                  <Text key={j} style={styles.bulletPoint}>• {acc}</Text>
                ))}
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemSubtitle}>{project.location}</Text>
                <Text style={styles.itemSubtitle}>{project.date}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={[styles.itemSubtitle, { marginBottom: 4 }]}>
                  • {skill}
                </Text>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Additional Items Section */}
      {data.additionalItems && data.additionalItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          {data.additionalItems.map((item, i) => (
            <View key={i} style={[styles.itemRow, { marginBottom: 8 }]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.accomplishments.map((acc, j) => (
                  <Text key={j} style={styles.bulletPoint}>• {acc}</Text>
                ))}
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemSubtitle}>
                  {item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : item.startDate || ''}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ResumePDF;
