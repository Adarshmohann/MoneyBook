import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textHighlight,
    marginTop: 6,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    marginHorizontal: 20,
    marginVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full, // Ultra round pill
    height: 56,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
    fontSize: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
    height: '100%',
    fontWeight: '500',
  },
  clearIcon: {
    fontSize: 20,
    padding: theme.spacing.sm,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: theme.spacing.sm,
    paddingBottom: 120, // Make room for FAB securely
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 64,
    opacity: 0.8,
  },
  emptyText: {
    marginTop: theme.spacing.lg,
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: '#0B0C10', // Dark contrast for the green FAB
  },
});
