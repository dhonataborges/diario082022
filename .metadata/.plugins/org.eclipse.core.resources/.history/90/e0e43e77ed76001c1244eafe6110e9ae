package com.kingoftech.api.services.impl;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.kingoftech.api.entities.Projetos;
import com.kingoftech.api.exceptions.UsuarioException;
import com.kingoftech.api.repositories.SimiosRepository;
import com.kingoftech.api.services.ProjetoService;

@Service
public class ProjetoServiceImpl implements ProjetoService {

	private final Logger LOG = LoggerFactory.getLogger(this.getClass());

	@Autowired
	SimiosRepository projetoRepository;

	public Page<Projetos> findPage(Integer page, Integer linesPage, String orderBy, String direction) {

		PageRequest pageRequest = PageRequest.of(page, linesPage, Direction.valueOf(direction), orderBy);
		return projetoRepository.findAll(pageRequest);

	}

	@Override
	public List<Projetos> AllProjetos() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteProjeto(Long id) {

		if (id == null) {

			throw new UsuarioException("id ou projeto não podem ser nulos ");
		}

		Optional<Projetos> projetoFound = this.projetoRepository.findById(id);

		if (!projetoFound.isPresent()) {

			throw new UsuarioException("projeto não presente ");
		}

		this.projetoRepository.delete(projetoFound.get());

	}

	@Override
	public void createProjeto(Projetos projeto) {
		// TODO Auto-generated method stub

	}

	@Override
	public Projetos updateProjeto(Long id, Projetos projeto) {

		if (id == null || projeto == null) {

			throw new UsuarioException("id ou projeto não podem ser nulos ");
		}

		Optional<Projetos> projetoFound = this.projetoRepository.findById(id);

		if (!projetoFound.isPresent()) {

			throw new UsuarioException("projeto não presente ");
		}

		projetoFound.get().setCodigo(projeto.getCodigo());
		projetoFound.get().setDataContratacao(projeto.getDataContratacao());
		projetoFound.get().setDescricao(projeto.getDescricao());
		projetoFound.get().setQuantidadeHoras(projeto.getQuantidadeHoras());
		projetoFound.get().setObservacao(projeto.getObservacao());

		LOG.info("atualizando projeto...");
		return this.projetoRepository.save(projetoFound.get());
	}

	@Override
	public Optional<Projetos> projetoById(@NonNull Long id) {

		if (id == null) {

			throw new UsuarioException("id do projeto não presente ");
		}

		return this.projetoRepository.findById(id);

	}
}
