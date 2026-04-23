import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    
    // Modern minimal shadow
    shadowColor: theme.colors.shadowColor,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    
    // Subtle inner depth
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  amountContainer: {
    backgroundColor: 'rgba(0, 208, 158, 0.1)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(0, 208, 158, 0.3)',
  },
  amount: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.textHighlight,
    letterSpacing: 0.5,
  },
});
