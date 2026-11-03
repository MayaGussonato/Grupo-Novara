import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MenuGlobal from '../../../components/MenuGlobal/MenuGlobal';
import { styles, adminColors } from './administracaoStyle';

const Swal = Platform.OS === 'web' ? require('sweetalert2').default : null;

const PAGE_SIZE = 10;

const FILTROS = [
  { key: 'todos', label: 'Todos' },
  { key: 'ativos', label: 'Ativos' },
  { key: 'inativos', label: 'Inativos' },
];

function getPageNumbers(current, total) {
  const maxVisible = 5;
  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  const end = Math.min(total, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);
  const pages = [];
  for (let i = start; i <= end; i += 1) pages.push(i);
  return pages;
}

export default function Administracao({
  activeMenu,
  onNavigate,
  usuarios,
  onAddUser,
  onEditUser,
  onDeleteUser,
}) {
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [filtro, setFiltro] = useState('todos');
  const [page, setPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [addHover, setAddHover] = useState(false);

  const counts = useMemo(() => {
    const ativos = usuarios.filter((u) => u.ativo).length;
    return {
      todos: usuarios.length,
      ativos,
      inativos: usuarios.length - ativos,
    };
  }, [usuarios]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return usuarios.filter((u) => {
      if (filtro === 'ativos' && !u.ativo) return false;
      if (filtro === 'inativos' && u.ativo) return false;
      if (!term) return true;
      return (
        u.nome.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.perfil.toLowerCase().includes(term) ||
        u.cargo.toLowerCase().includes(term)
      );
    });
  }, [usuarios, search, filtro]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  function handleSearch(text) {
    setSearch(text);
    setPage(1);
    setOpenMenuId(null);
  }

  function handleFiltro(key) {
    setFiltro(key);
    setPage(1);
    setOpenMenuId(null);
  }

  function goToPage(number) {
    if (number < 1 || number > totalPages) return;
    setPage(number);
    setOpenMenuId(null);
  }

  function handleEdit(usuario) {
    setOpenMenuId(null);
    onEditUser(usuario);
  }

  function handleDelete(usuario) {
    setOpenMenuId(null);

    if (Swal) {
      Swal.fire({
        title: 'Deseja excluir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: true,
        focusCancel: true,
        confirmButtonColor: adminColors.danger,
        cancelButtonColor: adminColors.cancel,
      }).then((result) => {
        if (result.isConfirmed) onDeleteUser(usuario.id);
      });
      return;
    }

    Alert.alert('Deseja excluir?', '', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', style: 'destructive', onPress: () => onDeleteUser(usuario.id) },
    ]);
  }

  return (
    <View style={styles.container}>
      <MenuGlobal activeMenu={activeMenu} onNavigate={onNavigate} />

      <View style={styles.main}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {openMenuId !== null && (
            <Pressable style={styles.overlay} onPress={() => setOpenMenuId(null)} />
          )}

          <View style={styles.header}>
            <View style={styles.headerRow}>
              <Ionicons name="settings-outline" size={30} color={adminColors.dark} />
              <Text style={styles.title}>Administração</Text>
            </View>
            <Text style={styles.subtitle}>
              Gerencie usuários, permissões e configurações do sistema
            </Text>
          </View>

          <View style={styles.toolbar}>
            <View style={[styles.searchBox, searchFocused && styles.searchBoxFocused]}>
              <Ionicons name="search-outline" size={20} color={adminColors.dark} />
              <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar usuários..."
                placeholderTextColor="#2F8A82"
                value={search}
                onChangeText={handleSearch}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.chips}>
              {FILTROS.map((item) => {
                const active = filtro === item.key;
                return (
                  <Pressable
                    key={item.key}
                    onPress={() => handleFiltro(item.key)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {item.label} ({counts[item.key]})
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={onAddUser}
              onHoverIn={() => setAddHover(true)}
              onHoverOut={() => setAddHover(false)}
              style={[styles.addButton, addHover && styles.addButtonHover]}
              accessibilityRole="button"
              accessibilityLabel="Adicionar usuário"
            >
              <Ionicons name="add" size={26} color={adminColors.white} />
            </Pressable>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.colNome}>
                <Text style={styles.headerText}>Nome</Text>
              </View>
              <View style={styles.colEmail}>
                <Text style={styles.headerText}>Email</Text>
              </View>
              <View style={styles.colPerfil}>
                <Text style={styles.headerText}>Perfil</Text>
              </View>
              <View style={styles.colCargo}>
                <Text style={styles.headerText}>Cargo</Text>
              </View>
              <View style={styles.colAcoes} />
            </View>

            {rows.length === 0 && (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>
              </View>
            )}

            {rows.map((usuario, index) => {
              const isOpen = openMenuId === usuario.id;
              const openUp = rows.length > 4 && index >= rows.length - 3;
              return (
                <Pressable
                  key={usuario.id}
                  onHoverIn={() => setHoveredRow(usuario.id)}
                  onHoverOut={() => setHoveredRow(null)}
                  style={[
                    styles.row,
                    hoveredRow === usuario.id && styles.rowHover,
                    isOpen && styles.rowOpen,
                  ]}
                >
                  <View style={styles.colNome}>
                    <View
                      style={[
                        styles.statusDot,
                        usuario.ativo ? styles.dotActive : styles.dotInactive,
                      ]}
                    />
                    <Text style={styles.cellText} numberOfLines={1}>
                      {usuario.nome}
                    </Text>
                  </View>
                  <View style={styles.colEmail}>
                    <Text style={styles.cellText} numberOfLines={1}>
                      {usuario.email}
                    </Text>
                  </View>
                  <View style={styles.colPerfil}>
                    <Text style={styles.cellText} numberOfLines={1}>
                      {usuario.perfil}
                    </Text>
                  </View>
                  <View style={styles.colCargo}>
                    <Text style={styles.cellText} numberOfLines={1}>
                      {usuario.cargo}
                    </Text>
                  </View>

                  <View style={styles.colAcoes}>
                    <Pressable
                      onPress={() => setOpenMenuId(isOpen ? null : usuario.id)}
                      style={[styles.moreButton, isOpen && styles.moreButtonActive]}
                      accessibilityRole="button"
                      accessibilityLabel="Ações do usuário"
                    >
                      <Ionicons name="ellipsis-vertical" size={20} color={adminColors.dark} />
                    </Pressable>

                    {isOpen && (
                      <View style={[styles.menu, openUp ? styles.menuUp : styles.menuDown]}>
                        <Pressable
                          onPress={() => handleEdit(usuario)}
                          onHoverIn={() => setHoveredItem(`edit-${usuario.id}`)}
                          onHoverOut={() => setHoveredItem(null)}
                          style={[
                            styles.menuItem,
                            hoveredItem === `edit-${usuario.id}` && styles.menuItemHover,
                          ]}
                        >
                          <Ionicons name="create-outline" size={18} color={adminColors.dark} />
                          <Text style={styles.menuItemText}>Editar usuário</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => handleDelete(usuario)}
                          onHoverIn={() => setHoveredItem(`del-${usuario.id}`)}
                          onHoverOut={() => setHoveredItem(null)}
                          style={[
                            styles.menuItem,
                            hoveredItem === `del-${usuario.id}` && styles.menuItemHover,
                          ]}
                        >
                          <Ionicons name="trash-outline" size={18} color={adminColors.danger} />
                          <Text style={[styles.menuItemText, styles.menuItemDangerText]}>
                            Excluir
                          </Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                </Pressable>
              );
            })}

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Mostrando {rows.length} de {filtered.length} usuários
              </Text>

              <View style={styles.pagination}>
                <Pressable
                  onPress={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
                >
                  <Ionicons name="chevron-back" size={16} color={adminColors.dark} />
                </Pressable>

                {pageNumbers.map((number) => {
                  const active = number === currentPage;
                  return (
                    <Pressable
                      key={number}
                      onPress={() => goToPage(number)}
                      style={[styles.pageButton, active && styles.pageButtonActive]}
                    >
                      <Text style={[styles.pageText, active && styles.pageTextActive]}>
                        {number}
                      </Text>
                    </Pressable>
                  );
                })}

                <Pressable
                  onPress={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={[
                    styles.pageButton,
                    currentPage === totalPages && styles.pageButtonDisabled,
                  ]}
                >
                  <Ionicons name="chevron-forward" size={16} color={adminColors.dark} />
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}