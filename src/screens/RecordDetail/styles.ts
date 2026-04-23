import { StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  amountContainer: {
    backgroundColor: 'rgba(0, 208, 158, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 208, 158, 0.3)',
    marginBottom: 24,
  },
  amount: {
    fontSize: 36,
    fontWeight: '900',
    color: theme.colors.textHighlight,
  },
  date: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 'auto',
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 82, 82, 0.3)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  deleteText: {
    color: '#FF5252',
  },
  editText: {
    color: theme.colors.textPrimary,
  },
});
