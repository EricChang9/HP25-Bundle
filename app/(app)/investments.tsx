import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../constants/theme';

export default function Investments() {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();
  const windowWidth = Dimensions.get('window').width;

  const portfolio = {
    totalInvested: 5000,
    totalReturns: 450,
    activeInvestments: 3,
    averageReturn: 9,
  };

  // Define the Investment Opportunity interface
  interface InvestmentOpportunity {
    id: number;
    title: string;
    description: string;
    riskLevel: string;
    expectedReturn: number;
    minInvestment: number;
    duration: string;
    diversification: number;
    sectors: string[];
    location: string;
  }

  // Generate 50 investment opportunities
  const generateOpportunities = (): InvestmentOpportunity[] => {
    const sectors = [
      ['Retail', 'Agriculture', 'Crafts'],
      ['Technology', 'Education', 'Healthcare'],
      ['Manufacturing', 'Tourism', 'Food Production'],
      ['Clean Energy', 'Water', 'Infrastructure'],
      ['Transportation', 'Logistics', 'Financial Services'],
      ['Arts', 'Media', 'Entertainment'],
      ['Fashion', 'Textiles', 'Housing'],
      ['Waste Management', 'Recycling', 'Sustainability'],
    ];
    
    const bundleTypes = [
      'Small Business Bundle',
      'Women Entrepreneurs Fund',
      'Youth Innovation Portfolio',
      'Agricultural Development Fund',
      'Tech Startups Collective',
      'Sustainable Energy Projects',
      'Microfinance Initiative',
      'Community Housing Network',
      'Healthcare Accessibility Fund',
      'Education Empowerment Bundle',
    ];
    
    const locations = [
      'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia',
      'Nigeria', 'Ghana', 'South Africa', 'Zambia', 'Senegal',
      'Botswana', 'Namibia', 'Mozambique', 'Malawi', 'Zimbabwe',
      'Ivory Coast', 'Cameroon', 'Benin', 'Togo', 'Mali',
      'Egypt', 'Morocco', 'Tunisia', 'Algeria', 'Sudan',
      'Angola', 'Liberia', 'Sierra Leone', 'Gambia', 'Mauritius',
      'Seychelles', 'Cape Verde', 'Lesotho', 'Eswatini', 'Burundi',
      'Congo', 'Gabon', 'Guinea', 'Burkina Faso', 'Niger',
      'Madagascar', 'Comoros', 'Somalia', 'Djibouti', 'Eritrea',
      'South Sudan', 'Central African Republic', 'Chad', 'Libya', 'Mauritania'
    ];
    
    const riskLevels = ['Low', 'Medium', 'High'];
    
    return Array.from({ length: 50 }, (_, i) => {
      const randomReturn = (5 + Math.random() * 10).toFixed(1);
      const randomInvestment = Math.floor(50 + Math.random() * 200);
      const randomDuration = Math.floor(3 + Math.random() * 21);
      const randomDiversification = Math.floor(5 + Math.random() * 30);
      const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      const randomSectors = sectors[Math.floor(Math.random() * sectors.length)];
      const location = locations[i % locations.length]; // Ensure each has a unique location
      const bundleType = bundleTypes[Math.floor(Math.random() * bundleTypes.length)];
      const title = `${location} ${bundleType}`;
      
      return {
        id: i + 1,
        title,
        description: `Support entrepreneurs and businesses in ${location} with a diverse portfolio of ${randomDiversification} loans`,
        riskLevel: randomRisk,
        expectedReturn: parseFloat(randomReturn),
        minInvestment: randomInvestment,
        duration: `${randomDuration} months`,
        diversification: randomDiversification,
        sectors: randomSectors,
        location
      };
    });
  };

  const opportunities = generateOpportunities();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      padding: spacing.lg,
    },
    title: {
      fontSize: typography.sizes['3xl'],
      fontWeight: '700' as const,
      marginBottom: spacing.lg,
    },
    statsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.base,
    },
    statCard: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: colors.surface,
      padding: spacing.base,
      borderRadius: borderRadius.lg,
      alignItems: 'center',
    },
    statValue: {
      fontSize: typography.sizes['2xl'],
      fontWeight: '700' as const,
      marginBottom: spacing.xs,
    },
    statLabel: {
      fontSize: typography.sizes.sm,
    },
    section: {
      padding: spacing.lg,
    },
    sectionTitle: {
      fontSize: typography.sizes.xl,
      fontWeight: '700' as const,
      marginBottom: spacing.base,
    },
    opportunityCard: {
      backgroundColor: colors.card,
      borderRadius: borderRadius.lg,
      padding: spacing.base,
      marginBottom: spacing.base,
      ...shadows.base,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    opportunityTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: '600' as const,
      flex: 1,
    },
    riskBadge: {
      backgroundColor: colors.badgeBackground,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
    },
    riskText: {
      fontSize: typography.sizes.xs,
      fontWeight: '500' as const,
    },
    description: {
      fontSize: typography.sizes.base,
      lineHeight: typography.lineHeights.normal,
      marginBottom: spacing.base,
    },
    detailsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.base,
      marginBottom: spacing.base,
    },
    detailItem: {
      flex: 1,
      minWidth: '45%',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: spacing.sm,
      borderRadius: borderRadius.base,
    },
    detailLabel: {
      fontSize: typography.sizes.xs,
      marginTop: spacing.xs,
    },
    detailValue: {
      fontSize: typography.sizes.base,
      fontWeight: '600' as const,
      marginTop: spacing.xs,
    },
    sectors: {
      marginBottom: spacing.base,
    },
    sectorsLabel: {
      fontSize: typography.sizes.base,
      fontWeight: '600' as const,
      marginBottom: spacing.sm,
    },
    sectorTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    sectorTag: {
      backgroundColor: colors.tagBackground,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
    },
    sectorText: {
      fontSize: typography.sizes.xs,
      fontWeight: '500' as const,
    },
    investButton: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.base,
      padding: spacing.base,
      alignItems: 'center',
    },
    investButtonText: {
      color: colors.text,
      fontSize: typography.sizes.base,
      fontWeight: '600' as const,
    },
    horizontalListContainer: {
      padding: spacing.lg,
    },
  });

  const renderOpportunityCard = ({ item }: { item: InvestmentOpportunity }) => (
    <View style={[styles.opportunityCard, { width: windowWidth * 0.85 }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.opportunityTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <View style={styles.riskBadge}>
          <Text style={[styles.riskText, { color: colors.badgeText }]}>
            {item.riskLevel} Risk
          </Text>
        </View>
      </View>

      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {item.description}
      </Text>

      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Ionicons name="trending-up" size={20} color={colors.primary} />
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
            Expected Return
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {item.expectedReturn}%
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time" size={20} color={colors.primary} />
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
            Duration
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {item.duration}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="wallet" size={20} color={colors.primary} />
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
            Min. Investment
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            ${item.minInvestment}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location" size={20} color={colors.primary} />
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
            Location
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {item.location}
          </Text>
        </View>
      </View>

      <View style={styles.sectors}>
        <Text style={[styles.sectorsLabel, { color: colors.text }]}>Sectors:</Text>
        <View style={styles.sectorTags}>
          {item.sectors.map((sector, index) => (
            <View key={index} style={styles.sectorTag}>
              <Text style={[styles.sectorText, { color: colors.tagText }]}>
                {sector}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.investButton}>
        <Text style={styles.investButtonText}>Invest Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Investment Portfolio</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              ${portfolio.totalInvested}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Total Invested
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              ${portfolio.totalReturns}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Total Returns
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {portfolio.activeInvestments}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Active Investments
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {portfolio.averageReturn}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Avg. Return
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Investment Opportunities
        </Text>
        
        <FlatList
          data={opportunities}
          renderItem={renderOpportunityCard}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={windowWidth * 0.85 + spacing.lg}
          decelerationRate="fast"
          contentContainerStyle={styles.horizontalListContainer}
        />
      </View>
    </ScrollView>
  );
} 