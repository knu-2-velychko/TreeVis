cmake_minimum_required(VERSION 3.13)
project(QTreeVis)

set(CMAKE_CXX_STANDARD 17)

add_executable(QTreeVis main.cpp tests.cpp Tree.h Tree.cpp TreeIterator.h TreeIterator.cpp)