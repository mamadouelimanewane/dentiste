import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        paddingBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'normal', // Use normal to avoid issues if bold is not loaded
        color: '#0f172a'
    },
    clinicInfo: {
        fontSize: 10,
        color: '#64748b',
        textAlign: 'right',
        lineHeight: 1.5
    },
    patientInfo: {
        marginBottom: 40,
        padding: 15,
        backgroundColor: '#f8fafc',
        borderRadius: 8
    },
    patientName: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#0f172a',
        marginBottom: 5
    },
    text: {
        fontSize: 10,
        color: '#334155',
        lineHeight: 1.5
    },
    table: {
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderColor: '#e2e8f0'
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row'
    },
    tableColHeader: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f1f5f9',
        borderColor: '#e2e8f0'
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: '#e2e8f0'
    },
    tableCellHeader: {
        margin: 8,
        fontSize: 10,
        fontWeight: 'normal',
        color: '#0f172a'
    },
    tableCell: {
        margin: 8,
        fontSize: 10,
        color: '#334155'
    },
    totalSection: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    totalText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#0f172a',
        backgroundColor: '#f8fafc',
        padding: 10,
        borderRadius: 8
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: 8,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 10
    }
});

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

interface InvoicePDFProps {
    invoiceNumber: string;
    date: string;
    patientName: string;
    patientPhone: string;
    items: InvoiceItem[];
    total: number;
}

export const InvoicePDF = ({ invoiceNumber, date, patientName, patientPhone, items, total }: InvoicePDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>FACTURE</Text>
                    <Text style={{ ...styles.text, marginTop: 5, color: '#94a3b8' }}>N° {invoiceNumber}</Text>
                    <Text style={{ ...styles.text, color: '#94a3b8' }}>Délivrée le {date}</Text>
                </View>
                <View style={styles.clinicInfo}>
                    <Text style={{ fontSize: 12, color: '#0f172a', marginBottom: 2 }}>DentoPrestige Elite</Text>
                    <Text>Plateau, Dakar Centre</Text>
                    <Text>contact@dentoprestige.sn</Text>
                    <Text>+221 77 000 00 00</Text>
                </View>
            </View>

            {/* Patient Info */}
            <View style={styles.patientInfo}>
                <Text style={styles.text}>Facturé à :</Text>
                <Text style={styles.patientName}>{patientName}</Text>
                <Text style={styles.text}>Téléphone : {patientPhone}</Text>
            </View>

            {/* Table */}
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={{ ...styles.tableColHeader, width: '40%' }}>
                        <Text style={styles.tableCellHeader}>Désignation</Text>
                    </View>
                    <View style={{ ...styles.tableColHeader, width: '20%' }}>
                        <Text style={styles.tableCellHeader}>Qté</Text>
                    </View>
                    <View style={{ ...styles.tableColHeader, width: '20%' }}>
                        <Text style={styles.tableCellHeader}>PU (FCFA)</Text>
                    </View>
                    <View style={{ ...styles.tableColHeader, width: '20%' }}>
                        <Text style={styles.tableCellHeader}>Total (FCFA)</Text>
                    </View>
                </View>

                {items.map(item => (
                    <View style={styles.tableRow} key={item.id}>
                        <View style={{ ...styles.tableCol, width: '40%' }}>
                            <Text style={styles.tableCell}>{item.description}</Text>
                        </View>
                        <View style={{ ...styles.tableCol, width: '20%' }}>
                            <Text style={styles.tableCell}>{item.quantity}</Text>
                        </View>
                        <View style={{ ...styles.tableCol, width: '20%' }}>
                            <Text style={styles.tableCell}>{item.unitPrice.toLocaleString('fr-FR')}</Text>
                        </View>
                        <View style={{ ...styles.tableCol, width: '20%' }}>
                            <Text style={styles.tableCell}>{(item.quantity * item.unitPrice).toLocaleString('fr-FR')}</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Total */}
            <View style={styles.totalSection}>
                <Text style={styles.totalText}>
                    Net à Payer : {total.toLocaleString('fr-FR')} FCFA
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Merci pour votre confiance.</Text>
                <Text>Ce document tient lieu de facture. Veuillez le conserver.</Text>
            </View>

        </Page>
    </Document>
);
