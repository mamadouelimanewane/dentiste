import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
    title: { fontSize: 24, marginBottom: 20, color: '#0f172a' },
    table: { display: 'flex', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#e2e8f0', borderRightWidth: 0, borderBottomWidth: 0 },
    tableRow: { margin: 'auto', flexDirection: 'row' },
    tableColHeader: { width: '25%', borderStyle: 'solid', borderWidth: 1, backgroundColor: '#f1f5f9', borderColor: '#e2e8f0', borderLeftWidth: 0, borderTopWidth: 0 },
    tableCol: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#e2e8f0', borderLeftWidth: 0, borderTopWidth: 0 },
    tableCellHeader: { margin: 8, fontSize: 10, color: '#0f172a' },
    tableCell: { margin: 8, fontSize: 10, color: '#334155' }
});

export const AccountingPDF = ({ journals }: { journals: any[] }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Grand Livre OHADA</Text>

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Journal</Text></View>
                    <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Code</Text></View>
                    <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Débit (FCFA)</Text></View>
                    <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Crédit (FCFA)</Text></View>
                </View>

                {journals.map((j: any, i: number) => (
                    <View style={styles.tableRow} key={i}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{j.name}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{j.code}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{j.debit}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{j.credit}</Text></View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);
