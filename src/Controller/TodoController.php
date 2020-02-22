<?php

namespace App\Controller;


use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
     * @Route("/read", name="api_todo_read")
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


    /**
     * @Route("/create", name="api_todo_create", methods={"POST"})
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());
        $todo = new Todo();
        $todo->setName($content->name);
        try{
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
            return $this->json([
                'todo'=>$todo->toArray()
            ]);
        }catch (Exception $exception){
            //error message
        }
    }


    /**
     * @Route("/update/{id}", name="api_todo_update")
     * @param Request $request
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(Request $request, Todo $todo)
    {
        $content = json_decode($request->getContent());
        $todo->setName($content->name);
        try{
            $this->entityManager->flush();

        }catch (Exception $exception)
        {

        }

        return $this->json([
            'message'=>'Todo has been updated!'
        ]);
    }


    /**
     * @Route("/delete", name="api_todo_delete")
     * @param Todo $todo
     */
    public function delete(Todo $todo)
    {
        try{
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        }catch (Exception $exception)
        {

        }
    }
}
