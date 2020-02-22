<?php

namespace App\Controller;

use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/todo")
 */
class TodoController extends AbstractController
{
    private $todoRepository;
    private $entityManager;


    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {

        $this->todoRepository = $todoRepository;
        $this->entityManager = $entityManager;
    }


    /**
     * @Route("/read", name="todo")
     */
    public function index()
    {
        $todos = $this->todoRepository->findAll();
        $arrayOfTodos = [];

        foreach($todos as $todo)
        {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }
}
